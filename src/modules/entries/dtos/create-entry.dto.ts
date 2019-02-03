import { IsString, IsInt, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateEntryDto {
  @IsInt()
  @IsOptional()
  @ApiModelProperty()
  readonly timestamp: number;

  @IsString()
  @IsOptional()
  @ApiModelProperty({ required: false })
  readonly code: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  readonly detail: string;
}
