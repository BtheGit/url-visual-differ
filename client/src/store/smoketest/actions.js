import { 
    EXECUTE_SMOKE_TEST,
} from './types';

 

export const executeSmoketest = () => dispatch => {
    console.log(dispatch)
    fetch('/api/smoketest', {
        method: 'GET'
    })
    .then(res => res.json())
    .then(console.log)
}