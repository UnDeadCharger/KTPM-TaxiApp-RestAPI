import { ApiProperty } from "@nestjs/swagger";

export class GeocoderDTO {
  @ApiProperty()
  address: string;
}
