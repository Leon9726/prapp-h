import { Injectable } from '@angular/core';

import * as $ from 'jquery';


@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  checkAnimazioni(id: any) {
    const inputs = $('#' + id).find('input');
    inputs.each(function focusOut(i, el) {
      if ($(el).val() !== '') {
        $($(el)).closest('.form-group').find('label').addClass('active');
      }
    });
  }

}
