export interface PHILGO_API_RESPONSE {
    acl: string;
    action: string;
    code: number;
    domain: string;
    event?: any;
    id: string;
    idx_member: string;
    message?: string;
    mode?: string;
    module: string;
    post_id: string;
    post_name: string;
    register_mode: string;
    session_id: string;
    site: string;
    user_id: any;
    user_name: string;
    version: string;
    idx?: any; // for post/comment update.
}
export interface User_Data {
  id : string;
  session_id? : string;
  nickname : string;
  password: string;
  name: string;
  email: string;
  mobile?: string;
  gender?: string;

  varchar_1?: string;
  varchar_2?: string;
  varchar_3?: string;
  varchar_4?: string;
  varchar_5?: string;
  varchar_6?: string;
  varchar_7?: string;
  varchar_8?: string;
  varchar_9?: string;
  varchar_10?: string;

  text_1?: string; // as url of photo
  text_2?: string;
  text_3?: string;
  text_4?: string;
  text_5?: string;
};


export interface LOGIN_DATA {
    id: string;             // member.id
    password?: string;      // member.password
    // idx?: string;           // member.idx. 회원 번호가 없이, 회원 아이디 + 세션 아이디로 로그인 가능하다.
    session_id?: string;    // member session_id
};


export interface PAGE_DATA {
    post_id: string;
    page_no: number;
    limit?: number;
};

export interface POST_AD {
    deleted: string;
    done_htmlspecialchars: number;
    idx: string;
    no_of_first_image: string;
    post_id: string;
    src: string;
    src_thumbnail: string;
    subject: string;
    url: string;
};
export interface POST_TOP_AD {
    category: string;
    gid: string;
    idx: string;
    idx_file: string;
    int_4: string;
    src: string;
    sub_category: string;
    url: string;
    varchar_5: string;
    varchar_11: string;
};

export interface POST_TOP_PREMIUM_AD {
    idx: string;
    image_src: string;
    no_of_view: string;
    region: string;
    src: string;
    sub_subject: string;
    subject: string;
    url: string;
    varchar_5: string;
    varchar_11: string;
    varchar_15: string;
    varchar_19: string;
};

export interface MEMBER {
    id: string;
    name: string;
    nickname: string;
};

export interface POST {
    bad: string;
    blind: string;
    category: string;
    content: string;
    deleted: string;
    depth: string;
    gid: string;
    good: string;
    idx: string;
    idx_member: string;
    idx_parent: string;
    idx_root: string;
    int_10: string;
    link: string;
    member: MEMBER;
    no_of_comment: string;
    no_of_view: string;
    photos: Array< PHOTOS >;
    post_id: string;
    stamp: string;
    subject: string;
    user_name: string;
}

export interface PHOTOS {
    idx: number;
    src: string;
    original_src: string;   
}

export interface POSTS extends PHILGO_API_RESPONSE {
    ads: Array<POST_AD>;
    page_no: number;
    post_id: string;
    post_name: string;
    post_top_ad: Array<POST_TOP_AD>;
    post_top_premium_ad: Array<POST_TOP_PREMIUM_AD>;
    posts: Array<POST>;
};



/**
 * Post data structure for create/update
 */
export interface QUESTION_DATA {
    module?: string; // for crate/update
    action?: string; // for create/update
    id?: string; // user id to create/update.
    session_id?: string; // user id to create or update.
    idx?
    stamp?
    idx_member?
    idx_root?
    idx_parent?
    list_order?
    depth?
    gid?
    post_id?
    group_id?
    category?
    sub_category?
    no_of_comment?
    no_of_attach?
    no_of_first_image?
    user_domain?
    subject?
    content?
    content_stripped?
    deleted?
    int_1?
    varchar_1?
    varchar_2?
    varchar_3?
    varchar_4?
};

export interface POST_RESPONSE extends PHILGO_API_RESPONSE {
    post: QUESTION_DATA;
};