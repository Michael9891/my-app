import {Pipe, PipeTransform} from '@angular/core';
@Pipe({name: 'capitalize'})
export class CapitalizePipe implements PipeTransform {

    transform(value: any) {
        if (value) {
            value = value.replace(/[^a-zA-Z ]/g, '');
            const temp = value.split(' ');
            value = '';
            for (const entry of temp) {
                value += (entry.charAt(0).toUpperCase() + entry.slice(1).toLowerCase() + ' ');
            }
            return value;
        }
        return value;
    }
}
