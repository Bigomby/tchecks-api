import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateEntryDto {
  @IsInt()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly timestamp: number;

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  readonly detail: string;
}
