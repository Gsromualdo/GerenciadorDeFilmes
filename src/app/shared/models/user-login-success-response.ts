export interface IUserLoginScuccessResponse {
    token: string;
	"user": {
		"id": number,
		"name": string,
		"email": string,
	};
}