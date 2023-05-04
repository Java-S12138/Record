use crate::{
    win_utils::{set_window_shadow},
};

mod win_utils;
mod lcu;
mod by_lcu;


fn main() {

    tauri::Builder::default()
        .setup(|app| {
            set_window_shadow(app);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            by_lcu::is_lcu_success,
            by_lcu::get_cur_sum,
            by_lcu::get_other_sum,
            by_lcu::get_other_sum_by_name,
            by_lcu::get_cur_rank_point,
            by_lcu::get_excel_champ,
            by_lcu::get_match_list,
            by_lcu::get_match_detail,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
