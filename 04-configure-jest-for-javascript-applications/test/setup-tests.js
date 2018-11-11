import 'react-testing-library/cleanup-after-each';

// to improve output of emotion classes, we need a serialiser
import {createSerializer} from 'jest-emotion';
import * as emotion from 'emotion';

// we extend expect's snapshot serialisers for only this file with an emotion
// serialiser
expect.addSnapshotSerializer(createSerializer(emotion));
