import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class ParseAmount {
    parseToXAF(amount: number): string {
        var amountString = amount + '';
        var count = 0;
        var result = '';
        var prefix = amountString.split('.')[0];
        var suffixe = amountString.split('.').length > 1 ? amountString.split('.')[1] : '00';
        for (let index = prefix.length - 1; index >= 0; index--) {
            result = prefix[index] + result;
            count++;
            if (count == 3) {
                count = 0;
                result = ',' + result;
            }
        }
        result += '.' + (suffixe.length > 1 ? suffixe : suffixe + '0');
        if (result[0] == ',')
            result = result.substring(1, result.length);

        return result;
    }
}