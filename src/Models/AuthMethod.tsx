export type AuthMethod = {
    name: string;
    display_name: string;
    color: string;
    client_id: string;
    client_secret?: string;
    authorize_url?: string;
    access_token_url?: string;
    redirect_url?: string;
};
