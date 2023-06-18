import DatePicker from "react-datepicker";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Select from "react-select";
import Lottie from "react-lottie";

import Card from "../../common/card";
import activities from "../../assets/json/data.json";
import { useState } from "react";
import { Activity } from "./activities";
import ListItem from "../../common/list";
import {
    IconBasketBall,
    IconCaloriesBurn,
    IconCaloriesBurnOutline,
    IconClimbing,
    IconClose,
    IconCycling,
    IconDancing,
    IconDate,
    IconDistance,
    IconDistanceOutline,
    IconDuration,
    IconKickBoxing,
    IconLifting,
    IconPilates,
    IconRowing,
    IconRunning,
    IconSoccer,
    IconSteps,
    IconSwimming,
    IconTennis,
    IconYoga,
} from "../../common/icons";
import "react-circular-progressbar/dist/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import { dateOptions, reactStyles } from "../../common/constant";
import { CaloriesGraph } from "./caloriesChart";
import ProfileImage from "../../assets/images/profile.jpg";
import { StepsGraph } from "./stepsChart";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import * as weightAnimationData from "../../assets/lottie/weight.json";
import * as heartBeatAnimationData from "../../assets/lottie/heartBeat.json";

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

const targetKcal = 800;
const targetSteps = 10000;
const totalActiveHour = 100;

const colorMapper: any = {
    kcal: "rgba(96, 153, 219, 1)",
    steps: "#61e194",
    hour: "rgba(233, 171, 198, 1)",
};

const iconMapper: any = {
    Running: <IconRunning />,
    Cycling: <IconCycling />,
    "Strength Training": <IconLifting />,
    Swimming: <IconSwimming />,
    Hiking: <IconClimbing />,
    Yoga: <IconYoga />,
    Elliptical: <IconDancing />,
    Basketball: <IconBasketBall />,
    Pilates: <IconPilates />,
    Rowing: <IconRowing />,
    Kickboxing: <IconKickBoxing />,
    Soccer: <IconSoccer />,
    CrossFit: <IconDancing />,
    Tennis: <IconTennis />,
    Dancing: <IconDancing />,
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
    console.log("activityData", activityData);

    return (
        <div className="background">
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
                        <img src={ProfileImage} alt="profile-image" />
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
                                    <Row>
                                        <Col md="6" sm="12">
                                            <p className="activity-distance">
                                                <IconDistanceOutline /> {selectedActivity.distance}
                                            </p>
                                        </Col>
                                        <Col md="6" sm="12">
                                            <p className="activity-gain">
                                                Elevation Gain : {selectedActivity.elevation_gain}
                                            </p>
                                        </Col>
                                        <Col md="6" sm="12">
                                            <p className="activity-heart-rate">
                                                Heart Rate Average :{" "}
                                                {selectedActivity.heart_rate.average}
                                            </p>
                                        </Col>
                                        <Col md="6" sm="12">
                                            <p>Heart Rate Max : {selectedActivity.heart_rate.max}</p>
                                        </Col>
                                        {selectedActivity.pace && (
                                            <Col md="6" sm="12">
                                                <p>Pace Average : {selectedActivity.pace.average}</p>
                                            </Col>
                                        )}
                                        {selectedActivity.pace && (
                                            <Col md="6" sm="12">
                                                <p>Pace Best : {selectedActivity.pace.best}</p>
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
                                        <p>
                                            {selectedActivity.calories_burned}/{targetKcal} kcal
                                        </p>
                                        <p>
                                            {(100 * selectedActivity.calories_burned) / targetKcal} %
                                        </p>
                                    </div>
                                    <div className="circular-progress-details">
                                        <p>
                                            {selectedActivity.steps || 0}/{targetKcal} steps
                                        </p>
                                        <p>
                                            {(100 * (selectedActivity.steps || 0)) / targetKcal} %
                                        </p>
                                    </div>
                                    <div className="circular-progress-details">
                                        <p>
                                            {selectedActivity.duration}/{targetKcal} hours
                                        </p>
                                        <p>{(100 * selectedActivity.duration) / targetKcal} %</p>
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
                                                <div style={{ width: "150px" }}>
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
