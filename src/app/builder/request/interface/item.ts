export interface Item {
        path: string;
        name: string;
        request: Request;
        response: Response;
}
export interface Request {
        url: string
        mothod: string; 
        body: Body;
        header: Array<Keyvalue>;
}
export interface Body {
        mode: string;
        formdata: Array<Keyvalue>;
        urlencoded: Array<Keyvalue>;
}
export interface Keyvalue {
        key: string
        value: string
        description?: string
        type?: string
}

export interface Response {
        url: string
}