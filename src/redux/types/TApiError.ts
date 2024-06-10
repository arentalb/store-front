export interface ApiError {
  data: {
    status: string;
    message: string;
  };
  status: string;
}
