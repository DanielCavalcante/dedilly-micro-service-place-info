import { PlaceInfo } from "../../domain/entities/place-info";
import { IPlaceInfoRepository } from "../../data/repositories/place-info-repository";
import { GetPlaceInfo } from "../../data/usecases/get-place-info-info";
import { HTTPRequest } from "../../infra/http/http-request";
import { HTTPResponse } from "../../infra/http/http-response";
import { PlaceInfoRequest } from "../../infra/http/place-info-request";

export class PlaceInfoController {
  constructor(private readonly repository: IPlaceInfoRepository) {}

  async get(
    _req: HTTPRequest<PlaceInfoRequest>
  ): Promise<HTTPResponse<PlaceInfo>> {
    try {
      const data = _req.payload;
      const getPlaceInfo = new GetPlaceInfo(this.repository);

      const placeInfo = await getPlaceInfo.execute(data);

      return { status: 200, data: placeInfo };
    } catch (e: unknown) {
      return { status: 500, data: { message: "system error" } };
    }
  }
}
