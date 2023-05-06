import { PlaceInfo } from "../../domain/entities/place-info";
import { IGetPlaceInfo } from "../../domain/usecases/get-place-info";
import { PlaceInfoRequest } from "../../infra/http/place-info-request";
import { IPlaceInfoRepository } from "../repositories/place-info-repository";
import geoCodeBaseUrl from "../../infra/services/geocode";

export class GetPlaceInfo implements IGetPlaceInfo {
  constructor(private readonly repository: IPlaceInfoRepository) {}

  async execute(data: PlaceInfoRequest): Promise<PlaceInfo> {
    const country = data.country ? `&country=${data.country}` : undefined;
    const response = await geoCodeBaseUrl.get(
      `search?city=${data.city}${!!country}`
    );
    const placeInformations = response.data?.display_name?.split(",");
    const placeInfo: PlaceInfo = {
      latitude: response.data.lat,
      longitute: response.data.lon,
      city: placeInformations[0],
      description: placeInformations[1],
      state: placeInformations[4],
      region: placeInformations[5],
      country: placeInformations[6],
    };

    return await this.repository.getLatLongByCityAndCountry(placeInfo);
  }
}
