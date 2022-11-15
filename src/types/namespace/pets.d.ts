export declare namespace Pets {

    export interface Pet {
        id: number;
        owner_id: number;
        name: string;
        born_at: number;
    }

    export interface Pagination {
        page: number;
        per_page: number;
    }

    export interface Info {
        count: number;
        total: number;
        pagination: Pagination;
        sort?: any;
    }

    export interface RootObject {
        pets: Pet[];
        info: Info;
    }

}