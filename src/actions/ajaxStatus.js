import * as types from '../config/constants';

export function beginAjaxCall() {
  return { type: types.BEGIN_AJAX_CALL };
}

export function ajaxCallError(type, error) {
  return { type : types.AJAX_CALL_ERROR };
}
