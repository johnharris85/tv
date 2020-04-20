import {formatSeasons} from "./formatSeasons"
import {show} from "../testData/show"
import {seasonOutput} from "../testData/seasons"

    test("should format seasons", () => {
        expect(formatSeasons(show._embedded.episodes)).toEqual(seasonOutput);  
    });
