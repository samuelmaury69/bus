import { takeEvery, call, put} from 'redux-saga/effects';
//import {showBalance,actionAnswer, showSearch,showRegister,showList,actionSessionActive,register_new_user,register_visit,show_visit,dispatchError,actionSessionEnable,actionTicket} from '../Config/Dispatch'
//import {searchFetch,loginFetch,balanceFetch,List_ClientsFetch,passwordFetch,New_userFetch,VisitFetch,Show_VisitFetch,UpdateFetch,ReestablishFetch,Ticket} from '../Config/Actions'


function* sagaTicket(values){
 const ListLanguage = yield call(ShowLanguage);
  switch (ListLanguage) {
      case 'error':
        yield put("dispatchError('ListLanguage')")
        break;
      default:
        yield put('actionAnswer(ListLanguage)')
        break;
    }
}

export default function* functionP(){
  yield takeEvery('Ticket',sagaTicket);
}