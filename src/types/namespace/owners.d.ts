export declare namespace Owners {
    export interface Owner {
        id: number;
        first_name: string;
        last_name: string;
        is_favorite: number | boolean;
        is_master: number;
        pet_total: number;
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
        owners: Owner[];
        info: Info;
    }

    export interface OwnerMaster {
        owner: Owner;
    }

}