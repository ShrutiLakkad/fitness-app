import DatePicker from "react-datepicker";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Lottie from "react-lottie";
import Select from "react-select";

import Card from "../../common/card";
import activities from "../../assets/json/data.json";
import { useState } from "react";
import { Activity } from "./activities";
import ListItem from "../../common/list";
import {
    IconBasketBall,
    IconCaloriesBurn,
    IconCaloriesBurnCircular,
    IconClimbing,
    IconClose,
    IconCrossFit,
    IconCycling,
    IconDancing,
    IconDate,
    IconDistance,
    IconDistanceOutline,
    IconDurationCircular,
    IconHeartRate,
    IconKickBoxing,
    IconLaps,
    IconLifting,
    IconPace,
    IconPilates,
    IconPoolLength,
    IconRepsWeightLifting,
    IconRowing,
    IconRowingStrokes,
    IconRunning,
    IconSoccer,
    IconSteps,
    IconStepsCircular,
    IconSwimming,
    IconTennis,
    IconWeightLifting,
    IconYoga,
} from "../../common/icons";
import EllipticalImage from "../../assets/images/icons8-elliptical-64.png";
import GainImage from "../../assets/images/gain.png";
import EllipticalStridesImage from "../../assets/images/elliptical strides.png";
import { dateOptions, reactStyles } from "../../common/constant";
import { CaloriesGraph } from "./caloriesChart";
import ProfileImage from "../../assets/images/profile.jpg";
import { StepsGraph } from "./stepsChart";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import * as weightAnimationData from "../../assets/lottie/weight.json";
import * as heartBeatAnimationData from "../../assets/lottie/heartBeat.json";
import * as avatarAnimationData from "../../assets/lottie/avatar.json";
import "react-circular-progressbar/dist/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import CustomModal from "../../common/modal";

const iconMapper: any = {
    Running: <IconRunning />,
    Cycling: <IconCycling />,
    "Strength Training": <IconLifting />,
    Swimming: <IconSwimming />,
    Hiking: <IconClimbing />,
    Yoga: <IconYoga />,
    Elliptical: (
        <img
            src={EllipticalImage}
            alt="elliptical"
            className="elliptical-image"
        />
    ),
    Basketball: <IconBasketBall />,
    Pilates: <IconPilates />,
    Rowing: <IconRowing />,
    Kickboxing: <IconKickBoxing />,
    Soccer: <IconSoccer />,
    CrossFit: <IconCrossFit />,
    Tennis: <IconTennis />,
    Dancing: <IconDancing />,
};

const weightAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: weightAnimationData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
};
const heartBeatAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: heartBeatAnimationData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
};
const avatarAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: avatarAnimationData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
};

const targetKcal = 800;
const targetSteps = 10000;
const totalActiveHour = 100;

const colorMapper: any = {
    kcal: "rgba(96, 153, 219, 1)",
    steps: "#61e194",
    hour: "#ffb30e",
};

const getProgressBarStyle: any = (mode: "kcal" | "steps" | "hour") => {
    return buildStyles({
        // Rotation of path and trail, in number of turns (0-1)

        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
        strokeLinecap: "round",

        // How long animation takes to go from one percentage to another, in seconds
        pathTransitionDuration: 0.5,

        // Colors
        pathColor: colorMapper[mode],
        trailColor: "#ffffff78",
    });
};

const FitnessApp = () => {
    const [selectedActivity, setSelectedActivity] = useState<Activity>(
        {} as Activity
    );
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filter, setFilter] = useState(dateOptions[0]);
    const [modalShow, setModalShow] = useState(false);

    const handleActivityClick = (activity: Activity) => {
        setSelectedActivity(activity);
    };


    const activityData =
        filter.value === "all"
            ? activities.activities
            : activities.activities.filter(
                (activity) =>
                    new Date(activity.date).toDateString() ===
                    selectedDate.toDateString()
            );

    const { user } = activities;
    return (
        <div className="background">
            <CustomModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                hideFooter
                title="Profile"
            >
                <Card className="user-profile d-flex justify-content-center align-items-center flex-column">
                    <div className="user-image">
                        <Lottie options={avatarAnimationOptions} height={300} width={300} />
                    </div>
                    <br />
                    <h1>{user.name}</h1>
                    <a href={`mailto:${user.email}`} className="user-email">
                        {user.email}
                    </a>
                    <Row className="user-details-grid">
                        <Col md="4" lg="4" sm="12" className="box d-flex justify-content-center align-items-center flex-column gap-1">
                            <h4>Age</h4>
                            <h5>{user.age}</h5>
                        </Col>
                        <Col md="4" lg="4" sm="12" className="box d-flex justify-content-center align-items-center flex-column gap-1">
                            <h4>Height</h4>
                            <h5>{user.height}</h5>
                        </Col>
                        <Col md="4" lg="4" sm="12" className="box d-flex justify-content-center align-items-center flex-column gap-1">
                            <h4>Weight</h4>
                            <h5>{user.weight}</h5>
                        </Col>
                    </Row>
                </Card>
            </CustomModal>
            <Card className="ap-header d-flex justify-content-between align-items-center">
                <div className="app-heading">
                    <h1>FITNESS APP</h1>
                </div>
                <div className="profile">
                    <OverlayTrigger
                        placement={"left"}
                        overlay={
                            <Tooltip id={`tooltip-${"left"}`}>
                                <div className="user-name">{activities.user.name}</div>
                                <div className="user-email">{activities.user.email}</div>
                            </Tooltip>
                        }
                    >
                        <img
                            src={ProfileImage}
                            alt="profile"
                            onClick={() => setModalShow(true)}
                        />
                    </OverlayTrigger>
                </div>
            </Card>
            <Row>
                <Col xl="4" lg="5" md="6" sm="12">
                    <div className="card-container">
                        <Card className={selectedActivity.id ? "flipped" : ""} width="100%">
                            {selectedActivity.id ? (
                                <div className="card-back" key={selectedActivity.id}>
                                    <div
                                        className="close-button"
                                        onClick={() => setSelectedActivity({} as Activity)}
                                    >
                                        <IconClose color="#424242" />
                                    </div>
                                    <div className="activity-name d-flex align-items-baseline gap-4">
                                        <p>{selectedActivity.name}</p>
                                        <span className="d-flex align-items-center gap-2">
                                            <IconDate color="#424242" /> {selectedActivity.date}
                                        </span>
                                    </div>

                                    {/* ----------------- */}
                                    <Row>
                                        <Col md="6" sm="12">
                                            <p className="activity-distance">
                                                <IconDistanceOutline /> {selectedActivity.distance} km
                                            </p>
                                        </Col>
                                        {selectedActivity.elevation_gain && (
                                            <Col md="6" sm="12">
                                                <p className="activity-gain">
                                                    <img
                                                        src={GainImage}
                                                        alt="gain"
                                                        className="gain-image"
                                                    />{" "}
                                                    {selectedActivity.elevation_gain}
                                                </p>
                                            </Col>
                                        )}

                                        <Col md="6" sm="12">
                                            <p>
                                                <IconHeartRate />
                                                {selectedActivity.heart_rate.average}/
                                                {selectedActivity.heart_rate.max}
                                            </p>
                                        </Col>
                                        {selectedActivity.pace && (
                                            <Col md="6" sm="12">
                                                <p>
                                                    <IconPace /> {selectedActivity.pace.best}/
                                                    {selectedActivity.pace.average}
                                                </p>
                                            </Col>
                                        )}
                                        {selectedActivity.reps && (
                                            <Col md="6" sm="12">
                                                <p>
                                                    <IconRepsWeightLifting />
                                                    {selectedActivity.reps.average_per_set}/
                                                    {selectedActivity.reps.total}
                                                </p>
                                            </Col>
                                        )}

                                        {selectedActivity.strides && (
                                            <Col md="6" sm="12">
                                                <p>
                                                    <img
                                                        src={EllipticalStridesImage}
                                                        alt="strides"
                                                        className="strides-image"
                                                    />
                                                    {selectedActivity.strides}
                                                </p>
                                            </Col>
                                        )}

                                        {selectedActivity.pool_length && (
                                            <Col md="6" sm="12">
                                                <p>
                                                    <IconPoolLength />
                                                    {selectedActivity.pool_length} m{" "}
                                                </p>
                                            </Col>
                                        )}
                                        {selectedActivity.laps && (
                                            <Col md="6" sm="12">
                                                <p>
                                                    <IconLaps /> {selectedActivity.laps}
                                                </p>
                                            </Col>
                                        )}
                                        {selectedActivity.strokes && (
                                            <Col md="6" sm="12">
                                                <p>
                                                    <IconRowingStrokes /> {selectedActivity.strokes}
                                                </p>
                                            </Col>
                                        )}
                                        {selectedActivity.weight_lifted && (
                                            <Col md="6" sm="12">
                                                <p>
                                                    <IconWeightLifting />
                                                    {selectedActivity.weight_lifted.average_per_rep}/
                                                    {selectedActivity.weight_lifted.total}
                                                </p>
                                            </Col>
                                        )}
                                    </Row>
                                    <div className="circular-progress">
                                        <div className="kcal-circular-progress">
                                            <CircularProgressbar
                                                maxValue={targetKcal}
                                                strokeWidth={8}
                                                styles={getProgressBarStyle("kcal")}
                                                value={selectedActivity.calories_burned}
                                                text={""}
                                            />
                                        </div>
                                        <div className="steps-circular-progress">
                                            <CircularProgressbar
                                                maxValue={targetSteps}
                                                strokeWidth={15}
                                                styles={getProgressBarStyle("steps")}
                                                value={selectedActivity.steps || 0}
                                                text={""}
                                            />
                                        </div>
                                        <div className="active-hour-circular-progress">
                                            <CircularProgressbar
                                                maxValue={totalActiveHour}
                                                strokeWidth={24}
                                                styles={getProgressBarStyle("hour")}
                                                value={selectedActivity.duration}
                                                text={""}
                                            />
                                        </div>
                                    </div>
                                    <div className="circular-progress-details">
                                        <p className="burn-circular">
                                            <IconCaloriesBurnCircular />{" "}
                                            {selectedActivity.calories_burned}/{targetKcal} kcal
                                        </p>
                                        <p>
                                            {(100 * selectedActivity.calories_burned) / targetKcal} %
                                        </p>
                                    </div>
                                    <div className="circular-progress-details">
                                        <p className="burn-circular">
                                            <IconStepsCircular /> {selectedActivity.steps || 0}/
                                            {targetSteps} steps
                                        </p>
                                        <p>
                                            {(100 * (selectedActivity.steps || 0)) / targetSteps} %
                                        </p>
                                    </div>
                                    <div className="circular-progress-details">
                                        <p className="burn-circular">
                                            <IconDurationCircular /> {selectedActivity.duration}/
                                            {totalActiveHour} hours
                                        </p>
                                        <p>
                                            {(100 * selectedActivity.duration) / totalActiveHour} %
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="card-front">
                                    <div className="card-heading">
                                        <h4>ACTIVITIES</h4>
                                        <div className="filter">
                                            <Select
                                                options={dateOptions}
                                                styles={reactStyles}
                                                value={filter}
                                                onChange={(option: any) => {
                                                    if (option) {
                                                        setFilter(option);
                                                        if (option.value === "custom") {
                                                            setSelectedDate(new Date());
                                                        }
                                                    }
                                                }}
                                            />
                                            {filter.value === "custom" && (
                                                <div style={{ width: "160px" }}>
                                                    <DatePicker
                                                        selected={selectedDate}
                                                        popperPlacement="bottom-end"
                                                        dateFormat="dd/mm/yyyy"
                                                        onChange={(date) => {
                                                            if (date) {
                                                                setSelectedDate(date);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {activityData.length === 0 && (
                                        <ListItem className="no-activity">
                                            No any activity founds.
                                        </ListItem>
                                    )}
                                    <div
                                        className="list-wrapper"
                                        style={{
                                            paddingRight: activityData.length > 8 ? "10px" : 0,
                                        }}
                                    >
                                        {activityData.map((activity: Activity, index) => (
                                            <ListItem
                                                onClick={() => handleActivityClick(activity)}
                                                key={index}
                                            >
                                                <div className="card-icons">
                                                    {iconMapper[activity.name]}
                                                </div>
                                                <div className="card-activities-details">
                                                    {activity.name}
                                                    <div className="card-details">
                                                        {activity.steps && (
                                                            <div className="card-activities-steps ">
                                                                <IconSteps />
                                                                {activity.steps}
                                                            </div>
                                                        )}
                                                        {activity.calories_burned && (
                                                            <div className="card-activities-calories">
                                                                <IconCaloriesBurn />
                                                                {activity.calories_burned}
                                                            </div>
                                                        )}
                                                        {activity.distance && (
                                                            <div className="card-activities-distance">
                                                                <IconDistance />
                                                                {activity.distance}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </ListItem>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </Card>
                    </div>
                </Col>
                <Col xl="8" lg="7" md="6" sm="12">
                    <Row>
                        <Col xl="6" lg="12" md="12" sm="12">
                            <Card className="heart-rate-card">
                                <Lottie
                                    options={heartBeatAnimationOptions}
                                    height={200}
                                    width={200}
                                />
                                <div className="heart-rate">
                                    <h3>HEART RATE</h3>
                                    <h1>90 bpm</h1>
                                    <h5>Previous rate : 88 bpm</h5>
                                </div>
                            </Card>
                        </Col>
                        <Col xl="6" lg="12" md="12" sm="12">
                            <Card className="weight-card">
                                <Lottie
                                    options={weightAnimationOptions}
                                    height={200}
                                    width={200}
                                />
                                <div className="weight">
                                    <h3>WEIGHT</h3>
                                    <h1>{activities.user.weight} kg</h1>
                                    <h5>Previous Weight : 78 kg</h5>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl="6" lg="12" md="12" sm="12">
                            <Card className="chart-card flex-column">
                                <h4>Calories</h4>
                                <div className="chart d-flex justify-content-center align-items-center">
                                    {activityData.length > 0 ? (
                                        <CaloriesGraph activityData={activityData} />
                                    ) : (
                                        <div>No Data Found</div>
                                    )}
                                </div>
                            </Card>
                        </Col>
                        <Col xl="6" lg="12" md="12" sm="12">
                            <Card className="chart-card flex-column">
                                <h4>Steps</h4>
                                <div className="chart d-flex justify-content-center align-items-center">
                                    {activityData.length > 0 ? (
                                        <StepsGraph activityData={activityData} />
                                    ) : (
                                        <div>No Data Found</div>
                                    )}
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};
export default FitnessApp;