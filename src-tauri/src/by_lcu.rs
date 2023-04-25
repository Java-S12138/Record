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
pub async fn get_cur_sum() -> Result<Value, String> {
    let client = &*REST_CLIENT;
    let res =  client.get("/lol-summoner/v1/current-summoner".to_string()).await.unwrap();
    Ok(res)

}

#[command]
pub async fn get_cur_rank_point() -> Result<Value, String> {
    let client = invoke_lcu::RESTClient::new().unwrap();
    let res =  client.get("/lol-summoner/v1/current-summoner".to_string()).await.unwrap();
    Ok(res)
}

