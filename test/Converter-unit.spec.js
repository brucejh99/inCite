import { toAPA, toMLA, toChicago, toHarvard } from '../src/services/Converter';
import chai from 'chai';

chai.should();

function makeData(title, authors, date, publisher, url, dateAccessed) {
    let metadata = {
        authors: [],
        dateAccessed: null
    };
    if(title) metadata.title = 'Title';
    if(authors) metadata.authors = ['FirstName MiddleName LastName'];
    if(date) metadata.date = '2017-12-21T15:00:01.069Z';
    if(publisher) metadata.publisher = 'Publisher';
    if(url) metadata.url = 'www.url.com/test/';
    if(dateAccessed) metadata.dateAccessed = '2018-12-25T15:00:01.069Z';
    return metadata;
}

describe('Unit tests for APA converter', function() {
    it('Should generate correct citations with full metadata', function() {
        const metadata = makeData(true, true, true, true, true, true, true);
        const expectedResult = 'LastName, F. M. (2017, December 21). <i>Title</i>. Publisher. Retrieved (2018, December 25), from www.url.com/test/';
        const citation = toAPA(metadata);
        citation.should.equal(expectedResult);
    });
    it('Should generate correct citations with no title', function() {
        const metadata = makeData(false, true, true, true, true, true, true);
        const expectedResult = 'LastName, F. M. (2017, December 21). Publisher. Retrieved (2018, December 25), from www.url.com/test/';
        const citation = toAPA(metadata);
        citation.should.equal(expectedResult);
    });
    it('Should generate correct citations with no author', function() {
        const metadata = makeData(true, false, true, true, true, true, true);
        const expectedResult = '<i>Title</i>. (2017, December 21). Publisher. Retrieved (2018, December 25), from www.url.com/test/';
        const citation = toAPA(metadata);
        citation.should.equal(expectedResult);
    });
    it('Should generate correct citations with no date published', function() {
        const metadata = makeData(true, true, false, true, true, true, true);
        const expectedResult = 'LastName, F. M. <i>Title</i>. Publisher. Retrieved (2018, December 25), from www.url.com/test/';
        const citation = toAPA(metadata);
        citation.should.equal(expectedResult);
    });
    it('Should generate correct citations with no publisher', function() {
        const metadata = makeData(true, true, true, false, true, true, true);
        const expectedResult = 'LastName, F. M. (2017, December 21). <i>Title</i>. Retrieved (2018, December 25), from www.url.com/test/';
        const citation = toAPA(metadata);
        citation.should.equal(expectedResult);
    });
    xit('Should do something with no url', function() {
        const metadata = makeData(true, true, true, true, false, true, true);
        const expectedResult = 'LastName, F. M. (2017, December 21). <i>Title</i>. Retrieved (2018, December 25), from www.url.com/test/';
        const citation = toAPA(metadata);
        citation.should.equal(expectedResult);
    });
    it('Should generate correct citations with no date retrieved', function() {
        const metadata = makeData(true, true, true, true, true, false, true);
        const expectedResult = 'LastName, F. M. (2017, December 21). <i>Title</i>. Publisher. Retrieved from www.url.com/test/';
        const citation = toAPA(metadata);
        citation.should.equal(expectedResult);
    });
});

describe('Unit tests for MLA converter', function() {
    xit('Should generate correct citations with full metadata', function() {
        const metadata = makeData(true, true, true, true, true, true, true);
        const expectedResult = '';
        const citation = toMLA(metadata);
        citation.should.equal(expectedResult);
    });
    xit('Should generate correct citations with no title', function() {
        const metadata = makeData(false, true, true, true, true, true, true);
        const expectedResult = '';
        const citation = toMLA(metadata);
        citation.should.equal(expectedResult);
    });
    xit('Should generate correct citations with no author', function() {
        const metadata = makeData(true, false, true, true, true, true, true);
        const expectedResult = '';
        const citation = toMLA(metadata);
        citation.should.equal(expectedResult);
    });
    xit('Should generate correct citations with no date published', function() {
        const metadata = makeData(true, true, false, true, true, true, true);
        const expectedResult = '';
        const citation = toMLA(metadata);
        citation.should.equal(expectedResult);
    });
    xit('Should generate correct citations with no publisher', function() {
        const metadata = makeData(true, true, true, false, true, true, true);
        const expectedResult = '';
        const citation = toMLA(metadata);
        citation.should.equal(expectedResult);
    });
    xit('Should do something with no url', function() {
        const metadata = makeData(true, true, true, true, false, true, true);
        const expectedResult = '';
        const citation = toMLA(metadata);
        citation.should.equal(expectedResult);
    });
    xit('Should generate correct citations with no date retrieved', function() {
        const metadata = makeData(true, true, true, true, true, false, true);
        const expectedResult = '';
        const citation = toMLA(metadata);
        citation.should.equal(expectedResult);
    });
});
