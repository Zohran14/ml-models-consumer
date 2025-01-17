import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from 'sequelize-typescript';
import {Optional} from 'sequelize';
import {WebCategoryType, HTMLWebData} from "@safekids-ai/web-category-types";

export interface WebCategoryUrlAttributes {
  url: string,
  meta: HTMLWebData,
  source: string,
  category: number[],
  rawCategory?: string,
  aiGenerated?: boolean,
  verified?: boolean,
  probability?: number[],
  wrongCategory?: boolean,
  createdBy?: string,
  updatedBy?: string,
}

export interface WebCategoryUrlCreationAttributes extends Optional<WebCategoryUrlAttributes, 'wrongCategory'> {
}

@Table({tableName: 'web_category_url', paranoid: true})
export class WebCategoryUrl extends Model<WebCategoryUrlAttributes, WebCategoryUrlCreationAttributes> {

  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
    field: "url"
  })
  url!: string;

  @Column({
    type: DataType.JSON,
    allowNull: false,
    field: "meta"
  })
  meta!: HTMLWebData;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "source"
  })
  source!: string;

  @Column({
    type: DataType.JSON,
    allowNull: false,
    field: "category",
    validate: {
      isArrayOfNumbers(value: any) {
        if (!Array.isArray(value) || !value.every((item) => typeof item === 'number')) {
          throw new Error('Category must be an array of numbers');
        }
      }
    }
  })
  category!: number[];

  getCategory(): number[] {
    const rawValue = this.getDataValue('category');
    return Array.isArray(rawValue) ? rawValue : [];
  }

  setCategory(value: number[]) {
    if (!Array.isArray(value) || !value.every(item => typeof item === 'number')) {
      throw new Error('Category must be an array of numbers');
    }
    this.setDataValue('category', value);
  }

  @Column({
    type: DataType.JSON,
    allowNull: true,
    field: "probability",
    validate: {
      isArrayOfNumbers(value: any) {
        if (!Array.isArray(value) || !value.every((item) => typeof item === 'number')) {
          throw new Error('Probability must be an array of numbers');
        }
      }
    }
  })
  probability!: number[];

  getProbability(): number[] {
    const rawValue = this.getDataValue('probability');
    return Array.isArray(rawValue) ? rawValue : [];
  }

  setProbability(value: number[]) {
    if (!Array.isArray(value) || !value.every(item => typeof item === 'number')) {
      throw new Error('Probability must be an array of numbers');
    }
    this.setDataValue('probability', value);
  }

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: "raw_category",
  })
  rawCategory?: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    field: "ai_generated"
  })
  aiGenerated?: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    field: "verified"
  })
  verified?: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    field: "wrong_category"
  })
  wrongCategory?: boolean;

  @Column({field: 'created_at', type: DataType.DATE})
  createdAt!: Date;

  @Column({field: 'updated_at', type: DataType.DATE})
  updatedAt!: Date;

  @Column({field: 'deleted_at', type: DataType.DATE, allowNull: true})
  deletedAt?: Date;

  @Column({field: 'created_by', allowNull: true, type: DataType.STRING(45)})
  createdBy?: string;

  @Column({field: 'updated_by', allowNull: true, type: DataType.STRING(45)})
  updatedBy?: string;
}
