import { IPlaceInfoRepository } from "../../data/repositories/place-info-repository";
import { PlaceInfo } from "../../domain/entities/place-info";

export class InMemoryPlaceInfoRepository implements IPlaceInfoRepository {
  constructor() {}

  async getLatLongByCityAndCountry(data: PlaceInfo): Promise<PlaceInfo> {
    return data;
  }
}
