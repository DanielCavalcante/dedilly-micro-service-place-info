import { PlaceInfo } from "../../domain/entities/place-info";

export interface IPlaceInfoRepository {
  getLatLongByCityAndCountry(data: PlaceInfo): Promise<PlaceInfo>;
}
