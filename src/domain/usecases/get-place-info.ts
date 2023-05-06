import { PlaceInfoRequest } from "../../infra/http/place-info-request";
import { PlaceInfo } from "../entities/place-info";
import { IUsecase } from "./usecase";

export interface IGetPlaceInfo extends IUsecase<PlaceInfoRequest, PlaceInfo> {}
