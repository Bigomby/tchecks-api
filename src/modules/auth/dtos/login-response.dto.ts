import { IsString, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly token: string;
}
