import { PlaceInfoRequest } from "../../infra/http/place-info-request";

export interface IUsecase<DataType, ReturnType> {
  execute(data: PlaceInfoRequest): Promise<ReturnType | null>;
}
