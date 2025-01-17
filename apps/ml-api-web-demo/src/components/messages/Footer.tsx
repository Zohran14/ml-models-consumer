import React, { useEffect, useRef } from 'react';
import { Flex, Input, Button } from '@chakra-ui/react';
interface FooterProps {
  inputMessage: string;
  setInputMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
  disabled: boolean;
}

const Footer: React.FC<FooterProps> = ({
  inputMessage,
  setInputMessage,
  handleSendMessage,
  disabled,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(()=>{
    if (ref.current) {
      ref.current.focus();
    }
  })
  return (
    <Flex w="100%" mt="5" gap="5" pt={4}>
      <Input
        placeholder="Type Something..."
        border="none"
        ref={ref}
        borderRadius="10px"
        _focus={{
          border: '1px solid black',
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage();
          }
        }}
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        disabled={disabled}
        id="message"
      />
      <Button
        bg="black"
        color="white"
        borderRadius="5px"
        _hover={{
          bg: 'white',
          color: 'black',
          border: '1px solid black',
        }}
        disabled={inputMessage.trim().length === 0}
        onClick={handleSendMessage}
      >
        Send
      </Button>
    </Flex>
  );
};

export default Footer;
