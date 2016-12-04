import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { MEMBER_LOGIN_DATA, SEARCH_QUERY_DATA } from './interfaces/quiz-module.interface';
import 'rxjs/add/operator/timeout';
export const PHILGO_MEMBER_LOGIN = 'philgo-login';

export class API {

    headers = new Headers ({'Content-Type':'application/x-www-form-urlencoded'})
    options = new RequestOptions({headers : this.headers});
    debug: boolean = false;

    constructor( public http: Http ){}

    getLogin():  MEMBER_LOGIN_DATA{
        return this.getLogin();
    }

    saveCache( cache_id, data ) {
        localStorage.setItem( cache_id, JSON.stringify(data) );
    }

    getLoginData(): MEMBER_LOGIN_DATA{
        let data = localStorage.getItem( PHILGO_MEMBER_LOGIN );
        try{
            let login = JSON.parse( data );
            return login;
        }
        catch ( e ){
            return null;
        }
    }
    get url(): string{
        return "http://test.philgo.com/index.php";
    }

    get( url, success: ( data: any )=> void, error?: ( e:any ) => void, complete?: () => void ){
        if ( this.debug ) console.info( "get", url );
        this.http.get( url ).timeout( 9000, new Error( 'timeout exceeded' ) ).subscribe(
             res => { 
                 this.responseData( res, success , error )
                }, 
             er=>{ 
                 this.responseConnectionError( er, error )
                }, 
            complete );

    }

    buildQuery ( params ){
        params[ 'module' ] = 'ajax';
        params[ 'submit' ] = 1;
        return this.http_build_query( params );
    }

    write( data: any, success: ( data: any ) => void, error?:( e: any ) => void, complete?: () => void){
        if( data['action'] === void 0 ) return error (" AJAX request 'action' value is empty");
        data = this.buildQuery( data );
        if( this.debug ){
            let url = this.url + '?' + data;
            console.info( "post: " + url );
        }
        this.http.post ( this.url, data, this.options ).timeout( 9000,
         new Error( 'timeout exceeded' ) ).subscribe( res=>{
                this.responseData( res, success, error ), e=>{
                    this.responseConnectionError( e, error ), complete
                }
            })
    }

    cacheCallback( cache_id, callback ) {
        let re = localStorage.getItem( cache_id );
        if ( re ) {
            try {
                let data = JSON.parse( re );
                if ( data ) callback( data );
            }
            catch (e) { }
        }
    }

    getUrl( qs: string = '' ) {
        return this.url + "?module=ajax&submit=1&action=" + qs;
    }


    responseConnectionError( error: Response | any, errorCallback: ( error : string ) => void ) {
        let errMsg: string;
        if ( error instanceof Response ) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        if ( errorCallback ) errorCallback("http-get/post-subscribe-error may-be-no-internet or wrong-domain or timeout or server-down: " );
    }


    version( successCallback: (version:string) => void, errorCallback?: (error: string) => void, completeCallback?: () => void ) {
        this.get(
            this.getUrl('version'),
            successCallback,
            errorCallback,
            completeCallback
        );
    }



    responseData( re, successCallback: ( data: any ) => void, errorCallback: ( error: string ) => void ) : any {
        console.log('responseData() re: ', re);
        let data;
        try {
            data = JSON.parse( re['_body'] );
        }
        catch( e ) {
            console.error(e);
            console.info(re);
            if ( errorCallback ) return errorCallback('json-parse-error');
        }
        if ( this.isRequestError(data) ) {
            if ( errorCallback ) return errorCallback( data.message )
        }
        else successCallback( data );
    }

    isRequestError( data ) : boolean {
        if ( data['code'] && parseInt( data['code'] ) != 0 ) return true;
        else return false;
    }

    http_build_query (formdata, numericPrefix='', argSeparator='') { 
        var urlencode = this.urlencode;
        var value
        var key
        var tmp = []
        var _httpBuildQueryHelper = function (key, val, argSeparator) {
            var k
            var tmp = []
            if (val === true) {
            val = '1'
            } else if (val === false) {
            val = '0'
            }
            if (val !== null) {
            if (typeof val === 'object') {
                for (k in val) {
                if (val[k] !== null) {
                    tmp.push(_httpBuildQueryHelper(key + '[' + k + ']', val[k], argSeparator))
                }
                }
                return tmp.join(argSeparator)
            } else if (typeof val !== 'function') {
                return urlencode(key) + '=' + urlencode(val)
            } else {
                throw new Error('There was an error processing for http_build_query().')
            }
            } else {
            return ''
            }
        }
        if (!argSeparator) {
            argSeparator = '&'
        }
        for (key in formdata) {
            value = formdata[key]
            if (numericPrefix && !isNaN(key)) {
            key = String(numericPrefix) + key
            }
            var query = _httpBuildQueryHelper(key, value, argSeparator)
            if (query !== '') {
            tmp.push(query)
            }
        }

        return tmp.join(argSeparator)
    }
    urlencode (str) {
        str = (str + '')
        return encodeURIComponent(str)
            .replace(/!/g, '%21')
            .replace(/'/g, '%27')
            .replace(/\(/g, '%28')
            .replace(/\)/g, '%29')
            .replace(/\*/g, '%2A')
            .replace(/%20/g, '+')
    }

    search( data: SEARCH_QUERY_DATA, successCallback: ( re: any ) => void, errorCallback: ( error: string ) => void, completeCallback?: () => void ) {
        let url = this.getUrl( 'search&' + this.http_build_query( data ) );
        this.get( url,
            successCallback,
            errorCallback,
            completeCallback );
    }

}