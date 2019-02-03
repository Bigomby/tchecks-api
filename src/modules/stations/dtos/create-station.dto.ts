import { IsString, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateStationDto {
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly name: string;
}
