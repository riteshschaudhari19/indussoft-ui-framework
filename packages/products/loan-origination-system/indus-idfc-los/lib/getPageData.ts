
const getPageData = async (fetchClient = fetch, config: any) => {   // , config: IndusConfig
    try {
        const res = await fetchClient(config.API.pageData, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                locale: config.locale,
                country: config.country,
            })
        })
        const data = await res.json()
        return data
    } catch (e) {
        console.log('error in get page data', e);
        
        throw e
    }
}
export default getPageData