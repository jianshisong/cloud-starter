import { projectDao } from 'common/da/daos';

import { wait } from 'common/utils';
import * as assert from 'assert';
import { initSuite } from './t-utils';
import { Project } from 'shared/entities';

/**
 * Test some basic crud operations with timestamps and all from admin (to access testing)
 *
 */

describe("test-dao-basic", async function () {

	const suite = initSuite(this);

	it('dao-basic-crud-project', async function () {
		try {
			let project: Project | undefined;

			// test create
			const projectId = await projectDao.create(suite.adminCtx, { name: 'test-dao-basic-crud-project_project-01' });
			suite.toClean('project', projectId);
			assert(Number.isInteger(projectId), 'project id');
			project = await projectDao.get(suite.adminCtx, projectId);
			assert.strictEqual(project.name, 'test-dao-basic-crud-project_project-01');
			const mtime1 = project.mtime!;

			// test update 
			await wait(10); // very short wait to make sure create/updatetime is not the same
			await projectDao.update(suite.sysCtx, projectId, { name: 'test-dao-basic-crud-project_project-01-updated' });
			project = await projectDao.get(suite.adminCtx, projectId);
			assert.strictEqual(project.name, 'test-dao-basic-crud-project_project-01-updated');
			const mtime2 = project.mtime!;

			//// check the timestamp
			// the modify time should have been modify from before
			assert.notStrictEqual(mtime2, mtime1, 'modify time');
			// make sure the ctime and mtime is different
			assert.notStrictEqual(project.ctime, project.mtime, 'ctime vs mtime');
			// check that the .mid and .cid
			assert.strictEqual(project.cid, suite.adminCtx.userId);
			assert.strictEqual(project.mid, suite.sysCtx.userId);

			// test list
			const projects = await projectDao.list(suite.adminCtx, { matching: { name: 'test-dao-basic-crud-project_project-01-updated' } });
			assert.strictEqual(projects[0].name, 'test-dao-basic-crud-project_project-01-updated');


		} catch (ex) {
			throw ex;
		}
	});

});