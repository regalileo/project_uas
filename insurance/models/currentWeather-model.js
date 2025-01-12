
const parseWeather = (data) => {
    return {
        location: data.location.name,
        region: data.location.region,
        country: data.location.country,
        temperature: data.current.temp_c,
        condition: data.current.condition.text,
        icon: data.current.condition.icon,
        last_updated: data.current.last_updated
    };
};

module.exports = parseWeather;
