import $axios from '/api/api'

export default class ChallengeApi {

    /**
     * 
     * @param {*} payload
     * 
     *      Create a Challenge 
     */
    static createChallenge (payload) {
        return $axios.post('/savers', payload)
    }

    /**
     * 
     * @param {*} planCode 
     * @param {*} payload 
     * 
     *      Join a Challenge
     */
    static joinChallenge (planCode, { request }) {
        return $axios.post()
    }

    /**
     *      Get Challenges in the public domain
     */
    static getPublicChallenges () {
        return $axios.get('/savers/public')
    }

    /**
     *      Get Personally created challenges
     */
    static getMyChallenges () {
        return $axios.get('/savers/my-plans')
    }

    /**
     * 
     * @param {*} saver 
     * @param {*} payload 
     * 
     *      Update a Challenge
     */
    static updateChallenge (saver, payload) {
        return $axios.put(`/savers/${saver}`, payload)
    }

    /**
     * 
     * @param {*} saver 
     * @param {*} param1 
     * 
     *      Leave a challenge
     */
    static leaveChallenge (saver, { Saver }) {
        return $axios.delete(`savers/${saver}`, { Saver })
    }
}
