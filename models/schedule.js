const mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId;

const scheduleSchema = new mongoose.Schema({
    _id: ObjectId,
    CIF_bank_holiday_running: String,
    CIF_stp_indicator: String,
    CIF_train_uid: String,
    applicable_timetable: String,
    atoc_code: String,
    new_schedule_segment: {
        traction_class: String,
        uic_code: String
    },
    schedule_days_runs: String,
    schedule_end_date: String,
    schedule_segment: {
        signalling_id: String,
        CIF_train_category: String,
        CIF_headcode: String,
        CIF_course_indicator: Number,
        CIF_train_service_code: String,
        CIF_business_sector: String,
        CIF_power_type: String,
        CIF_timing_load: String,
        CIF_speed: String,
        CIF_operating_characteristics: String,
        CIF_train_class: String,
        CIF_sleepers: String,
        CIF_reservations: String,
        CIF_connection_indicator: String,
        CIF_catering_code: String,
        CIF_service_branding: String,
        schedule_location: [{
            location_type: String,
            record_identity: String,
            tiploc_code:String,
            tiploc_instance:String,
            arrival:String,
            departue:String,
            pass:String,
            public_arrival:String,
            public_departure:String,
            platform:String,
            line:String,
            path:String,
            engineeing_allowance:String,
            pathing_allowance:String,
            performance_allowance:String,
        }],
    },
    schedule_start_date: String,
    train_status: String,
})

const SCHEDULE = mongoose.model('schedules', scheduleSchema)
module.exports = SCHEDULE;