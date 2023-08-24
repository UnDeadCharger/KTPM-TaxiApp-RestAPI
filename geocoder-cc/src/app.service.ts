import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  convertLocation = (GeocoderDTO) => {

    // console.log('https://geocode.maps.co/search?q={' + GeocoderDTO.address + '}')
    fetch('https://geocode.maps.co/search?q={' + GeocoderDTO.address + '}')
    .then(response => response.json())
    .then(data => {
      console.log(`Data retrieved from geocode:`,data[0])
      if(data[0]){
        console.log(`Địa chỉ: ${data[0].display_name}\nGPS: ${data[0].lat}, ${data[0].lon}`)
        // alert(`Địa chỉ: ${data[0].display_name}\nGPS: ${data[0].lat}, ${data[0].lon}`)
        return {
          lat : data[0].lat,
          lng: data[0].lon
        }
      }
      else {
        console.log(`${GeocoderDTO.address} không tồn tại`)
      }
    })
  }  
  
  getHello(): string { 
    return 'Hello World!';
  }

  getGeocode(address: string) {
    return 'Hello World!'; //!soon will be replaced by geocoder
  }

  mySuperLongProcessOfUser(data: any): Promise<void> {
    // Specify 'void' as the return type
    return new Promise<void>((resolve) => {
      // Specify 'void' for the Promise type
      setTimeout(() => {
        console.log(`done processing ${JSON.stringify(data)}`);
        resolve();
      }, 10000);
    });
  }
}
