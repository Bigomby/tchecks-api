import { IsString, IsNotEmpty } from 'class-validator';

export class CreateStationDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
