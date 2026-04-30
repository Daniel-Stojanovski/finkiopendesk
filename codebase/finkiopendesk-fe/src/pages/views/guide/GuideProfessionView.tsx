import '../views.scss';
import { useEffect, useState } from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import { api, backapi } from "../../../shared/axios";
import { useAuth } from "../../../shared/AuthContext";

import GuideProfessionRoadmap from "./GuideProfessionRoadmap";
import GuideProfessionSubjectCards from "./GuideProfessionSubjectCards";
import type {SubjectDto} from "../../../shared/dto/SubjectDto";
import type {ProfessionDto} from "../../../shared/dto/ProfessionDto";
import type {VotesDataDto} from "../../../shared/dto/VoteDataDto";

const GuideProfessionView = () => {
    const { pid } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [subjects, setSubjects] = useState<SubjectDto[]>([]);
    const [profession, setProfession] = useState<ProfessionDto | null>(null);
    const [votes, setVotes] = useState<Map<string, number>>(new Map());
    const [userVotes, setUserVotes] = useState<Map<string, number>>(new Map());
    const [loading, setLoading] = useState(true);

    const location = useLocation();

    const [activeTab, setActiveTab] = useState<"roadmap" | "voting">(
        location.state?.tab === "voting" ? "voting" : "roadmap"
    );

    useEffect(() => {
        if (location.state?.tab) {
            setActiveTab(location.state.tab);
        }
    }, [location.state]);

    useEffect(() => {
        if (!pid) return;

        const fetchData = async () => {
            setLoading(true);

            try {
                await Promise.all([
                    api.get<SubjectDto[]>(`/subjects/pid/${pid}`).then(res => setSubjects(res.data)),
                    api.get<ProfessionDto>(`/professions/${pid}`).then(res => setProfession(res.data)),
                    backapi.get<VotesDataDto[]>(`/votes/pid/${pid}`).then(res => setVotes(
                        new Map(res.data.map((v: VotesDataDto) => [v.subjectId, v.voteCount]))
                    ))
                ]);

                if (user?.userId) {
                    const userVotesRes = await backapi.get<VotesDataDto[]>(`/votes/pid/${pid}/${user.userId}`);
                    setUserVotes(
                        new Map(userVotesRes.data.map((v: VotesDataDto) => [v.subjectId, v.voteCount]))
                    );
                }

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [pid, user]);

    const [selectedProgramOption, setSelectedProgramOption] = useState<string>("all");

    return (
        <>
            <div id="guide-profession-view">
                <div className="gpv-header">
                    <i className="bi bi-arrow-left"
                       onClick={() => navigate("/careers")}>
                    </i>
                    <div className="gpv-header-title">
                        <h1>{profession?.name}</h1>
                        <p>{profession?.description}</p>
                    </div>
                </div>

                <div className="gpv-tab-header">
                    <div className="gpv-tab-header-tabs">
                        <button className={activeTab === "roadmap" ? "active" : ""} onClick={() => setActiveTab("roadmap")}>
                            Roadmap
                        </button>
                        <button className={activeTab === "voting" ? "active" : ""} onClick={() => setActiveTab("voting")}>
                            Voting
                        </button>
                    </div>
                </div>

                <div className="gpv-program-pills">
                    <span><i className="bi bi-sliders2"></i></span>
                    {/*<span><i className="bi bi-sliders2"></i> Program: </span>*/}
                    <span className={`pill ${selectedProgramOption === "all" ? "active" : ""}`} onClick={() => setSelectedProgramOption("all")}>
                        Basic
                    </span>

                    {profession?.programs?.map(p => (
                        <span key={p.programId} className={`pill ${selectedProgramOption === p.name ? "active" : ""}`}
                            onClick={() => setSelectedProgramOption(prev => prev === p.name ? "all" : p.name)}
                        >
                            {p.name}
                        </span>
                    ))}
                </div>

                <div className="gpv-tab-content">
                    {activeTab === "roadmap" ? (
                        <GuideProfessionRoadmap
                            subjects={subjects}
                            profession={profession}
                            loading={loading}
                        />
                    ) : (
                        <GuideProfessionSubjectCards
                            subjects={subjects}
                            votes={votes}
                            userVotes={userVotes}
                            profession={profession}
                            loading={loading}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default GuideProfessionView;