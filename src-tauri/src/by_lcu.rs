use crate::{
    lcu::invoke_lcu
};
use tauri::{command};
use serde_json::Value;
use invoke_lcu::RESTClient;
use lazy_static::lazy_static;

lazy_static!{
    static ref REST_CLIENT:RESTClient = RESTClient::new().unwrap();
}


#[command]
pub fn is_lcu_success() -> bool {
    let client =RESTClient::new();
    if client.is_ok() {
        true
    }else {
        false
    }
}

#[command]
pub async fn get_cur_sum() -> Result<Value, String> {
    let client = &*REST_CLIENT;
    let res =  client.get("/lol-summoner/v1/current-summoner".to_string()).await.unwrap();
    Ok(res)

}

#[command]
pub async fn get_cur_rank_point(puuid:String) -> Result<Value, String> {
    let client = &*REST_CLIENT;
    let url = format!("/lol-ranked/v1/ranked-stats/{}", puuid).to_string();
    let res =  client.get(url).await.unwrap();
    Ok(res)
}

