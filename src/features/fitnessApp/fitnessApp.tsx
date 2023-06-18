import DatePicker from "react-datepicker";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Select from "react-select"

import Card from "../../common/card";
import activities from '../../assets/json/data.json';
import { useState } from "react";
import { Activity } from "./activities";
import ListItem from "../../common/list";
import { IconBasketBall, IconCaloriesBurn, IconCaloriesBurnCircular, IconCaloriesBurnOutline, IconClimbing, IconClose, IconCrossFit, IconCycling, IconDancing, IconDate, IconDistance, IconDistanceOutline, IconDuration, IconDurationCircular, IconHeartRate, IconKickBoxing, IconLaps, IconLifting, IconPace, IconPilates, IconPoolLength, IconPoolLengthOutline, IconRepsWeightLifting, IconRowing, IconRowingStrokes, IconRunning, IconSoccer, IconSteps, IconStepsCircular, IconSwimming, IconTennis, IconWeightLifting, IconYoga } from "../../common/icons";
import 'react-circular-progressbar/dist/styles.css';
import "react-datepicker/dist/react-datepicker.css";
import { dateOptions, reactStyles } from "../../common/constant";
import { CaloriesGraph } from "./caloriesChart";
import ProfileImage from '../../assets/images/profile.jpg';
import EllipticalImage from '../../assets/images/icons8-elliptical-64.png';
import GainImage from '../../assets/images/gain.png';
import EllipticalStridesImage from '../../assets/images/elliptical strides.png';
import { StepsGraph } from "./stepsChart";
import moment from "moment";

const targetKcal = 800;
const targetSteps = 10000;
const totalActiveHour = 100

const colorMapper: any = {
    kcal: "#4e72f0",
    steps: "#61e194",
    hour: "#ffcb41",
}

const iconMapper: any = {
    "Running": <IconRunning />,
    "Cycling": <IconCycling />,
    "Strength Training": <IconLifting />,
    "Swimming": <IconSwimming />,
    "Hiking": <IconClimbing />,
    "Yoga": <IconYoga />,
    "Elliptical": <img src={EllipticalImage} alt="elliptical-image" className="elliptical-image" />,
    "Basketball": <IconBasketBall />,
    "Pilates": <IconPilates />,
    "Rowing": <IconRowing />,
    "Kickboxing": <IconKickBoxing />,
    "Soccer": <IconSoccer />,
    "CrossFit": <IconCrossFit />,
    "Tennis": <IconTennis />,
    "Dancing": <IconDancing />,
}



const getProgressBarStyle: any = (mode: 'kcal' | 'steps' | 'hour') => {
    return buildStyles({
        // Rotation of path and trail, in number of turns (0-1)

        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
        strokeLinecap: 'round',

        // How long animation takes to go from one percentage to another, in seconds
        pathTransitionDuration: 0.5,

        // Colors
        pathColor: colorMapper[mode],
        trailColor: '#d6d6d6',
    })
}


const FitnessApp = () => {
    const [selectedActivity, setSelectedActivity] = useState<Activity>({} as Activity);
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [filter, setFilter] = useState(dateOptions[0]);
    const [isCardOpen, setIsCardOpen] = useState(false);


    const handleActivityClick = (activity: Activity) => {
        setSelectedActivity(activity);
    };

    const handleCardClose = () => {
        setIsCardOpen(!isCardOpen);
    };

    const activityData = filter.value === "all" ? activities.activities : activities.activities.filter(activity => new Date(activity.date).toDateString() === selectedDate.toDateString())
    console.log("activityData", activityData);

    return (
        <div className="background">
            <div className="container">
                <div className="card-container">
                    <Card className={selectedActivity.id ? "flipped" : ""} width="450px">
                        {selectedActivity.id ? (
                            <div className="card-back" onClick={() => setSelectedActivity({} as Activity)} key={selectedActivity.id}>
                                <div className="cross-icon" onClick={handleCardClose}>
                                    <IconClose />
                                </div>
                                <p className="activity-name">{selectedActivity.name}</p>
                                <p className="activity-date"><IconDate />{moment(selectedActivity.date).format("DD/MM/YYYY")}</p>
                                <p className="activity-distance"><IconDistanceOutline /> {selectedActivity.distance} km</p>
                                {selectedActivity.elevation_gain && <p className="activity-gain"><img src={GainImage} alt="gain-image" className="gain-image" /> {selectedActivity.elevation_gain}</p>}
                                <p><IconHeartRate />{selectedActivity.heart_rate.average}/{selectedActivity.heart_rate.max}</p>
                                {selectedActivity.pace && <p><IconPace /> {selectedActivity.pace.best}/{selectedActivity.pace.average}</p>}
                                {selectedActivity.reps && <p><IconRepsWeightLifting />{selectedActivity.reps.average_per_set}/{selectedActivity.reps.total}</p>}
                                {selectedActivity.strides && <p> <img src={EllipticalStridesImage} alt="strides-image" className="strides-image" /> {selectedActivity.strides}</p>}
                                {selectedActivity.pool_length && <p><IconPoolLength />{selectedActivity.pool_length} m </p>}
                                {selectedActivity.laps && <p><IconLaps /> {selectedActivity.laps}</p>}
                                {selectedActivity.strokes && <p><IconRowingStrokes /> {selectedActivity.strokes}</p>}
                                {selectedActivity.weight_lifted && <p><IconWeightLifting />{selectedActivity.weight_lifted.average_per_rep}/{selectedActivity.weight_lifted.total}</p>}
                                <div className="circular-progress">
                                    <div className="kcal-circular-progress">
                                        <CircularProgressbar maxValue={targetKcal} strokeWidth={8} styles={getProgressBarStyle('kcal')} value={selectedActivity.calories_burned} text={""} />
                                    </div>
                                    <div className="steps-circular-progress">
                                        <CircularProgressbar maxValue={targetSteps} strokeWidth={15} styles={getProgressBarStyle('steps')} value={selectedActivity.steps || 0} text={""} />
                                    </div>
                                    <div className="active-hour-circular-progress">
                                        <CircularProgressbar maxValue={totalActiveHour} strokeWidth={24} styles={getProgressBarStyle('hour')} value={selectedActivity.duration} text={""} />
                                    </div>
                                </div>
                                <div className="circular-progress-details">
                                    <p className="burn-circular">
                                        <IconCaloriesBurnCircular /> {selectedActivity.calories_burned}/{targetKcal} kcal
                                    </p>
                                    <p>
                                        {(100 * selectedActivity.calories_burned) / targetKcal} %
                                    </p>
                                </div>
                                <div className="circular-progress-details">
                                    <p className="burn-circular">
                                        <IconStepsCircular />  {selectedActivity.steps || 0}/{targetSteps} steps
                                    </p>
                                    <p>
                                        {(100 * (selectedActivity.steps || 0)) / targetSteps} %
                                    </p>
                                </div>
                                <div className="circular-progress-details">
                                    <p className="burn-circular">
                                        <IconDurationCircular />   {selectedActivity.duration}/{totalActiveHour} hours
                                    </p>
                                    <p>
                                        {(100 * selectedActivity.duration) / totalActiveHour} %
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="card-front">
                                <div className="card-heading">
                                    <h2>Activities</h2>
                                    <Select
                                        options={dateOptions}
                                        styles={reactStyles}
                                        value={filter}
                                        onChange={(option: any) => {
                                            if (option) {
                                                setFilter(option)
                                                if (option.value === "custom") {
                                                    setSelectedDate(new Date())
                                                }
                                            }
                                        }}
                                    />
                                    {filter.value === "custom" && (
                                        <div style={{ width: "150px" }}>
                                            <DatePicker selected={selectedDate} dateFormat="dd/mm/yyyy" onChange={(date) => {
                                                if (date) {
                                                    setSelectedDate(date)
                                                }
                                            }} />
                                        </div>
                                    )}
                                </div>
                                {activityData.length === 0 && (
                                    <ListItem className="no-activity">No any activity founds.</ListItem>
                                )}
                                <div className="list-wrapper" style={{ paddingRight: activityData.length > 8 ? "10px" : 0 }}>
                                    {activityData.map((activity: Activity, index) => (
                                        <ListItem onClick={() => handleActivityClick(activity)} key={index}>
                                            <div className="card-icons">
                                                {iconMapper[activity.name]}
                                            </div>
                                            <div className="card-activities-details">
                                                {activity.name}
                                                <div className="card-details">
                                                    {activity.steps &&
                                                        <div className="card-activities-steps ">
                                                            <IconSteps />{activity.steps}
                                                        </div>
                                                    }
                                                    {activity.calories_burned &&
                                                        <div className="card-activities-calories">
                                                            <IconCaloriesBurn />{activity.calories_burned}
                                                        </div>
                                                    }
                                                    {activity.distance &&
                                                        <div className="card-activities-distance">
                                                            <IconDistance />{activity.distance}
                                                        </div>
                                                    }
                                                    {activity.pool_length &&
                                                        <div className="card-activities-steps ">
                                                            <IconPoolLengthOutline />{activity.pool_length}
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </ListItem>
                                    ))}
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
                <div className="profile-image">
                    <div className="user-details">
                        <h2 className="user-name">{activities.user.name}</h2>
                        <h2 className="user-name">{activities.user.email}</h2>
                    </div>
                    <img src={ProfileImage} alt="profile-image" />
                    <div className="weight-container">
                        <Card className="weight-card">
                            <div className="current-weight">
                                <p>Current Weight: {activities.user.weight} kg</p>
                            </div>
                        </Card>
                        <Card>
                            <div className="current-weight">
                                <p> Previous Weight : 78 kg</p>
                            </div>
                        </Card>
                    </div>
                </div>
                {activityData.length > 0 &&
                    <Card className="calories-chart-card">
                        <div className="calories-chart">
                            <CaloriesGraph activityData={activityData} />
                        </div>
                    </Card>
                }
                {activityData.length > 0 &&
                    <Card className="calories-chart-card">
                        <div className="calories-chart">
                            <StepsGraph activityData={activityData} />
                        </div>
                    </Card>
                }
            </div>
        </div>
    );
};
export default FitnessApp;