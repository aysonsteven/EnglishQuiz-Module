import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { API } from '../server';
import { PAGE_DATA, POSTS, POST_DATA, POST_RESPONSE} from '../interfaces/quiz-module.interface';
export * from '../interfaces/quiz-module.interface';
import * as _ from 'lodash';

@Injectable()

export class Quiz extends API {

    constructor( http: Http){
        super( http );
    }

    hasError( data: POST_DATA ): boolean | string{
        if ( data.id === void 0 ) return 'id-is-empty';
        if ( data.session_id === void 0 ) return 'session_id-is-empty';
        if ( data.action === void 0 ) return 'action-is-empty';

        if ( data.action == 'post_write_submit' ) {
            if ( data.post_id === void 0 ) return 'post-id-is-empty';
        }
        else if  ( data.action == 'post_edit_submit' ) {
            if ( data.idx === void 0 ) return 'idx-is-empty';
        }
        else if  ( data.action == 'comment_write_submit' ) {
            if ( data.idx_parent === void 0 ) return 'idx_parent-is-empty';
        }
        else if ( data.action == 'post_delete_submit' ) {
            if ( data.idx === void 0 ) return 'idx-is-empty';
            else return false;
        }

        if ( data.subject === void 0 ) return 'subject-is-empty';
        if ( data.content === void 0 ) return 'content-is-empty';
        return false;
    }
    getError( data: POST_DATA ): string{
        return <string> this.hasError( data );
    }

    add( data: POST_DATA, success: ( res: POST_RESPONSE ) => void, error?: ( e: string ) => void, complete?: () => void){
        data['action'] = 'post_write_submit'
        let login = this.getLoginData();
        data.id = login.id;
        data.session_id = login.session_id;
        if( this.hasError( data ) ) return error( this.getError( data ) );
        this.write( data,
        success,
        error,
        complete );
    }
    edit( data: POST_DATA, success: ( res: POST_RESPONSE ) => void, error?: ( e: string ) => void, complete?: () => void){
        data['action'] = 'post_edit_submit';
        let login = this.getLoginData();
        data.id = login.id;
        data.session_id = login.session_id;
        if( this.hasError( data ) ) return error( this.getError( data ) );
        this.write( data,
            success,
            error,
            complete );
    }
    get( idx, success: ( res: any ) => void, error?: ( error: string ) => void, complete?: () => void){
        let url = this.getUrl( 'post_get_submit&idx=' + idx );
        super.get( url,
        success,
        error,
        complete );        
    }

    delete( idx, success: ( res: any ) => void, error?: ( e: string ) => void, complete?: () => void){
        let data = {}
        data['idx'] = idx;
        data['action'] = 'post_delete_submit';
        let login = this.getLoginData();
        data['id'] = login.id;
        data['session_id'] = login.session_id;
        if( this.hasError( data ) ) return error( this.getError( data) );
        this.write( data,
        success,
        error,
        complete );
    }

    page( data: PAGE_DATA, successCallback: ( re: POSTS ) => void, errorCallback: ( error: string ) => void ) {
        let url = this.getUrl() + 'post-list&post_id=' + data.post_id + '&page_no=' + data.page_no + '&limit=30';
        if ( data.page_no == 1 ) this.cacheCallback( data.post_id, successCallback );

        console.log('page(): url: ', url);
        this.get( url, re => {

        }, errorCallback );

        this.http.get( url )
            .subscribe( re => {
                console.log('post::page() re: ', re);
                this.responseData( re, (posts: POSTS) => {
                    if ( data.page_no == 1 ) this.saveCache( data.post_id, posts );
                    successCallback( posts );
                }, errorCallback );
            });
    }
}
