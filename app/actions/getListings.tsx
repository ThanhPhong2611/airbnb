import axios from "axios";
import {ServerAPI, ListAPI} from '../environment/constant';

export interface IListingsParams {

}

export default async function getListings(
  params: IListingsParams
) {
  await axios.get(`${ServerAPI}/${ListAPI.LISTING_GETALL}`).then((response) => {

    let listings = response.data.listings;
    return listings;
  }).catch((err) => {
    console.log('error', err);
  });
}
