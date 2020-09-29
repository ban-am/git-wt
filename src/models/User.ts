export interface UserSchemaDefault {
    id: number;
    name: string;
    username: string;
    state: string;
    avatar_url: string;
    web_url: string;
}

export interface JiraUser {
    username: string;
    password: string;
}