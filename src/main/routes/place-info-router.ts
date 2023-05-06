import { IPlaceInfoRepository } from "../../data/repositories/place-info-repository";
import { IAdapter } from "../../infra/http/adapter";
import { PlaceInfoRequest } from "../../infra/http/place-info-request";
import { IRouter } from "../../infra/http/router";
import { PlaceInfoController } from "../controllers/place-info-controller";

export class PlaceInfoRouter implements IRouter {
  constructor(
    private readonly adapter: IAdapter,
    private readonly repository: IPlaceInfoRepository
  ) {}

  register(): void {
    const controller = new PlaceInfoController(this.repository);

    this.adapter.adapt<PlaceInfoRequest, any>(
      "/place-info",
      "GET",
      controller.get.bind(controller)
    );
  }
}
