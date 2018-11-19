import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateStationDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
