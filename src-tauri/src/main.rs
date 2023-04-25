use crate::{
    win_utils::{set_window_shadow},
    lcu::invoke_lcu::RESTClient
};

mod win_utils;
mod lcu;
mod by_lcu;

#[tauri::command]
fn is_lcu_success() -> bool {
    let client =RESTClient::new();
    if client.is_ok() {
        true
    }else {
        false
    }
}

fn main() {

    tauri::Builder::default()
        .setup(|app| {
            set_window_shadow(app);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            is_lcu_success,by_lcu::get_cur_sum
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
