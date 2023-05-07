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
  ): Promise<HTTPResponse<PlaceInfo | string>> {
    try {
      const data = _req.payload;
      const getPlaceInfo = new GetPlaceInfo(this.repository);

      const placeInfo = await getPlaceInfo.execute(data);

      if (!placeInfo) {
        return {
          status: 404,
          data: `Not found city for paramater: ${data.city}`,
        };
      }

      return { status: 200, data: placeInfo };
    } catch (e: unknown) {
      return { status: 500, data: { message: "system error" } };
    }
  }
}
