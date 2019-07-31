/* eslint no-empty: 0 */
import OctoTvService from '../octotv.service'
import context from 'jest-plugin-context'

describe('service Octo TV', () => {
  let service
  let httpClient
  const wellFormedVideoAPIReturn = { data: { success: true, videos: [{ id: 1 }] } }
  const unsuccessVideoAPIReturn = { data: { success: false, videos: [{ id: 1 }] } }
  beforeEach(() => {
    httpClient = {}
    service = new OctoTvService(httpClient)
  })
  describe.only('#getVideos', () => {
    const baseGetVideoURL = 'channels/content/'
    context('when the video api return a video list welled formed', () => {
      const categoryId = 42
      beforeEach(() => {
        const video = { ...wellFormedVideoAPIReturn }
        httpClient.get = jest.fn().mockResolvedValue(video)
      })
      it('should call get', async () => {
        // When
        await service.getVideos(categoryId)
        // Then
        expect(httpClient.get).toHaveBeenCalled()
      })
      it('should call get only once', async () => {
        // When
        await service.getVideos(categoryId)
        // Then
        expect(httpClient.get).toHaveBeenCalledTimes(1)
      })
      it('should call api with the given categoryId', async () => {
        // When
        await service.getVideos(categoryId)
        // Then
        expect(httpClient.get).lastCalledWith(baseGetVideoURL + '?parent_oid=' + categoryId)
      })
      it('should return the video well formed', async () => {
        const expectedResult = wellFormedVideoAPIReturn.data.videos
        // When
        const result = await service.getVideos(categoryId)
        // Then
        expect(result).toEqual(expectedResult)
      })
    })
    context('when the video api return a video list with an unsuccessfull error', () => {
      const categoryId = 42
      beforeEach(() => {
        const video = { ...unsuccessVideoAPIReturn }
        httpClient.get = jest.fn().mockResolvedValue(video)
      })
      it('should call get', async () => {
        try {
          // When
          await service.getVideos(categoryId)
        } catch {} finally {
          // Then
          expect(httpClient.get).toHaveBeenCalled()
        }
      })
      it('should call get only once', async () => {
        try {
          // When
          await service.getVideos(categoryId)
        } catch {} finally {
          // Then
          expect(httpClient.get).toHaveBeenCalledTimes(1)
        }
      })
      it('should call api with the given categoryId', async () => {
        try {
          // When
          await service.getVideos(categoryId)
        } catch {} finally {
          // Then
          expect(httpClient.get).lastCalledWith(baseGetVideoURL + '?parent_oid=' + categoryId)
        }
      })
      it('should throw an unknown error', async () => {
        try {
          // When
          await service.getVideos(categoryId)
        } catch (e) {
          // Then
          expect(e.message).toEqual('Unknown error')
        }
      })
    })
  })
})
