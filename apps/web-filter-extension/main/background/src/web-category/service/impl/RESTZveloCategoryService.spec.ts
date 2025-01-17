import {RESTWebCategoryCategoriesService} from '@shared/web-category/service/impl/RESTWebCategoryCategoriesService';
import {LRUCache} from '@shared/cache/LRUCache';
import {ConsoleLogger} from '@shared/logging/ConsoleLogger';
import {jest} from '@jest/globals';
import {WebCategoryApiResponse} from '@shared/web-category/domain/WebCategoryApiResponse';

function mockFetchResponse(data: any) {
  // @ts-ignore
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(data),
      ok: () => true,
    })
  ) as jest.Mock;
}

function mockAbortControllerResponse() {
  // @ts-ignore
  global.AbortController = jest.fn(() =>
    Promise.resolve({
      abort: () => Promise.resolve(),
    })
  ) as jest.Mock;
}

describe('REST WebCategory category service test', () => {
  let service: RESTWebCategoryCategoriesService;
  const logger = new ConsoleLogger();

  beforeEach(async () => {
    service = new RESTWebCategoryCategoriesService(new LRUCache<string, number[]>(200), logger);
  });
  beforeAll(() => {
    jest.clearAllMocks();
  });

  describe('REST - Get codes by host ', () => {
    it('Should get codes by host', async () => {
      //given
      const host = '10014tobacco.com';
      const categories = {
        url: 'facebook.com',
        codes: [10094],
      };
      mockFetchResponse(categories);
      mockAbortControllerResponse();
      const config = {
        url: 'url',
        key: 'key',
      };

      //when
      let result = await service.getHostCategoryCodes(host, config);

      //then
      expect(result).toBeTruthy();
      expect(result).toEqual(categories.codes);
    });

    it('Should get codes from cache', async () => {
      //given
      const host = 'testurl.com';
      const categories = {
        url: 'facebook.com',
        codes: [10094],
      };
      const config = {
        url: 'url',
        key: 'key',
      };
      jest.spyOn(service, 'getWebCategoryCategoryByUrl').mockResolvedValue(categories);

      //when
      let result = await service.getHostCategoryCodes(host, config);

      //then
      expect(result).toBeTruthy();
      expect(result).toEqual(categories.codes);

      //when
      result = await service.getHostCategoryCodes(host, config);

      //then
      expect(result).toBeTruthy();
      expect(result).toEqual(categories.codes);
      //should be called one time. second time, it should return from cache
      expect(service.getWebCategoryCategoryByUrl).toBeCalledTimes(1);
    });

    it('Should not return any code if API call fails ', async () => {
      //given
      const host = '10014tobacco.com';

      let lookupUrlSpy = jest.spyOn(service, 'getWebCategoryCategoryByUrl').mockImplementation(async (): Promise<WebCategoryApiResponse | undefined> => {
        return;
      });

      const config = {
        url: 'url',
        key: 'key',
      };

      //when
      let result = await service.getHostCategoryCodes(host, config);

      //then
      expect(result).toBeTruthy();
      expect(lookupUrlSpy).toBeCalledTimes(1);
    });
  });
  describe('REST - Get WebCategory Category By Url ', () => {
    //given
    const host = '10014tobacco.com';
    const categories = {
      url: 'facebook.com',
      codes: [10094],
    };
    mockFetchResponse(categories);

    const config = {
      url: 'url',
      key: 'key',
    };

    it('Should return category for a url', async () => {
      //when
      const result = await service.getWebCategoryCategoryByUrl(host, config);

      //then
      expect(result).toBeTruthy();
      expect(result).toMatchObject(categories);
    });

    it('Should return undefined if error occurs', async () => {
      jest.spyOn(service, 'lookupUrl').mockImplementation(async (): Promise<WebCategoryApiResponse> => {
        throw {name: 'AbortError'};
      });
      //when
      const result = await service.getWebCategoryCategoryByUrl(host, config);

      //then
      expect(result).toBeFalsy();
    });

    it('Should retry if api fails', async () => {
      jest.spyOn(service, 'lookupUrl').mockImplementation(async (): Promise<WebCategoryApiResponse> => {
        throw new Error('');
      });

      let exception = false;
      //when
      const result = await service.getWebCategoryCategoryByUrl(host, config).catch(() => {
        exception = true;
      });

      //then
      expect(result).toBeFalsy();
      expect(exception).toBeTruthy();
      expect(service.lookupUrl).toBeCalledTimes(2);
    });
  });
});
