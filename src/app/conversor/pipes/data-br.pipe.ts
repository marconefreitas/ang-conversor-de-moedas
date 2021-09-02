import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataBr'
})
export class DataBrPipe implements PipeTransform {

  transform(dataEm: string): string{
    if(!dataEm ){
      return '';
    }

    const dataArr = dataEm.split('-');

    if (dataArr.length !== 3){
      return dataEm;
    }

    return dataArr[2] + '/' + dataArr[1] + '/' + dataArr[0];
  }

}
