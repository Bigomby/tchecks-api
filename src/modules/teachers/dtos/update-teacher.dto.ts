import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateTeacherDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsString()
  @ApiModelProperty()
  readonly code: string;
}
